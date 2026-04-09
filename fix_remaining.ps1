$path = 'C:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent\kaytxx-workforce.tsx'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Fix remaining 11 CircleDot occurrences (0-indexed)
$lines[2370] = $lines[2370] -replace 'setSortCircleDot', 'setSortType'
$lines[2409] = $lines[2409] -replace 'AI Complaint CircleDot Agent', 'AI Complaint Handling Agent'
$lines[2471] = $lines[2471] -replace 'AI Compliance CircleDot Agent', 'AI Compliance Monitoring Agent'
$lines[2599] = $lines[2599] -replace 'sortCircleDot', 'sortType'
$lines[2602] = $lines[2602] -replace 'navigateToCircleDot', 'navigateToCategory'
$lines[2640] = $lines[2640] -replace 'selectedCircleDot', 'selectedCategory'
$lines[2695] = $lines[2695] -replace 'navigateToCircleDot', 'navigateToCategory'
$lines[2726] = $lines[2726] -replace 'categoryCircleDot', 'categoryColor'
$lines[2839] = $lines[2839] -replace '<CircleDot', '<ScrollView'
$lines[2898] = $lines[2898] -replace 'Tab CircleDot', 'Tab Navigation'
$lines[2922] = $lines[2922] -replace '<CircleDot', '<ScrollView'

[System.IO.File]::WriteAllLines($path, $lines, [System.Text.Encoding]::UTF8)
Write-Output "Fixed 11 remaining lines"
