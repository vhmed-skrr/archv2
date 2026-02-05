
Add-Type -AssemblyName System.Drawing

$quality = 75
$maxWidth = 1920
$imageFolder = "d:\web v\images"

# Get JPEG Encoder
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)

Get-ChildItem -Path $imageFolder -Filter *.jpg | ForEach-Object {
    $path = $_.FullName
    $name = $_.Name
    $tempPath = "$path.tmp"
    
    $img = $null
    $bmp = $null
    $graph = $null
    
    try {
        $img = [System.Drawing.Image]::FromFile($path)
        $msg = "Processing $name... "
        
        # Calculate New Dimensions
        $newWidth = $img.Width
        $newHeight = $img.Height
        $shouldResize = $false

        if ($img.Width -gt $maxWidth) {
            $scale = $maxWidth / $img.Width
            $newWidth = [int]($img.Width * $scale)
            $newHeight = [int]($img.Height * $scale)
            $shouldResize = $true
        }
        
        if ($shouldResize) {
            $msg += "Resizing to $newWidth px... "
        }

        # Create new file path
        # Resize/Compress
        $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # Save to temp
        $bmp.Save($tempPath, $codec, $encoderParams)
        
        # Release file handles immediately so we can overwrite if needed
        if ($graph) { $graph.Dispose(); $graph = $null }
        if ($bmp) { $bmp.Dispose(); $bmp = $null }
        if ($img) { $img.Dispose(); $img = $null }

        # Compare sizes
        $oldSize = (Get-Item $path).Length
        $newSize = (Get-Item $tempPath).Length

        if ($newSize -lt $oldSize) {
            Move-Item -Path $tempPath -Destination $path -Force
            $savings = [math]::Round((($oldSize - $newSize) / $oldSize) * 100, 1)
            Write-Host "$msg Optimized! Saved $savings%." -ForegroundColor Green
        }
        else {
            Remove-Item $tempPath -ErrorAction SilentlyContinue
            Write-Host "$msg Already optimized." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "Error processing $name : $($_.Exception.Message)" -ForegroundColor Red
        if (Test-Path $tempPath) { Remove-Item $tempPath -ErrorAction SilentlyContinue }
    }
    finally {
        if ($graph) { $graph.Dispose() }
        if ($bmp) { $bmp.Dispose() }
        if ($img) { $img.Dispose() }
    }
}
