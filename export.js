$(function() {
  
  // **************
  // Initialization
  // **************
  const csvFileName = 'team-membership-roster-export.csv'
  const csvDelimiter = ','
  const csvHeader = 'Display Name' + csvDelimiter + 'Title' + csvDelimiter + 'Location' + csvDelimiter + 'Role' + csvDelimiter + 'UPN' + '\r\n' // CSV header row
  let csvContent = csvHeader // Initialize CSV content
  const rosterLength = $('.td-member-display-name').length // Number of visible members
  
  // Check if we're an owner of the team
  let roleSelector = '.td-member-role' // Consider we're not an owner by default
  if ($('.td-member-editable-role').length > 0) {
    roleSelector = '.td-member-editable-role' // Override if we're an owner
  }
  
  // ************************
  // Iterate over each member
  // ************************
  for (let index = 0; index < rosterLength; index++) {
    // Extract the display name, title, location and role
    const displayName = $('.td-member-display-name').eq(index).text()
    const title = $('.td-member-title').eq(index).text()
    const location = $('.td-member-location').eq(index).text()
    const role = $(roleSelector).eq(index).text()
    const upn = $('.td-member-photo img').eq(index).attr('upn')
    // Append to the CSV content
    // const csvRow = displayName + csvDelimiter + title + csvDelimiter + location + csvDelimiter + role + csvDelimiter + upn + '\r\n'
    const csvEmail = upn + ';'
    csvContent += csvEmail
  }

  // Debug the export to console
  console.info(rosterLength + ' members exported:')
  console.info(csvContent)

  // **********************************************************
  // Dynamically generates a CSV file and triggers its download
  // **********************************************************

  // Create a dynamic "a" tag
  var element = document.createElement('a')
  // Set href link with content
  element.setAttribute(
    'href',
    'data:application/json;charset=utf-8,' + encodeURIComponent(csvContent)
  )
  // Set downloaded file name
  element.setAttribute('download', csvFileName)
  // Hide the elemement and add it to the page
  element.style.display = 'none'
  document.body.appendChild(element)
  // Launch download
  element.click()
  // Remove element
  document.body.removeChild(element)
})
