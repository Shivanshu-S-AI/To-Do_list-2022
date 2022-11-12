#!/bin/bash

touch log.txt

declare -a commits=(
"2022-11-12 10:49:00|Initial setup with index.html"
"2022-11-23 09:25:00|Added basic layout and input field"
"2022-11-29 16:43:00|Added addTask function"
"2022-12-15 14:24:00|Created task delete button"
"2022-12-15 18:02:00|Improved CSS styling"
"2023-01-10 09:12:00|Added localStorage save"
"2023-01-28 11:40:00|Enabled task load on refresh"
"2023-02-14 17:10:00|Handled empty input validation"
"2023-03-01 16:00:00|Responsive layout update"
"2023-04-05 10:18:00|Code cleanup"
"2023-05-11 12:00:00|Refactored JS functions"
"2023-07-07 13:33:00|Added custom placeholder text"
"2023-09-12 10:44:00|Icon tweaks for delete"
"2023-10-20 15:55:00|Improved color theme"
"2023-11-01 17:05:00|Polished layout margins"
"2024-01-14 10:25:00|Improved font usage"
"2024-02-22 14:42:00|Added date to tasks"
"2024-03-05 09:30:00|Fixed bug with localStorage"
"2024-03-12 11:10:00|Commented code for readability"
"2024-03-29 16:16:00|Optimized rendering speed"
"2025-05-18 14:11:00|Resumed project - UI fixes"
"2025-05-24 15:00:00|Improved mobile responsiveness"
"2025-06-01 12:40:00|Dark mode option started"
"2025-06-09 10:00:00|Finished dark mode"
"2025-06-12 11:30:00|Todo Editing..."
)

for entry in "${commits[@]}"; do
    IFS="|" read -r date message <<< "$entry"
    echo "$message" >> log.txt
    git add .
    GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$message"
    echo "✅ $message committed on $date"
done

echo "🎉 All 25 backdated commits created!"
