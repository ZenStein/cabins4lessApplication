


//first get headers, so we know what month we are dealing with
export const headers = [
    {headerName: 'Cabin', field: 'cabin', pinned:'left'},
    {headerName: '2/1 Wednesday', field: 'w02012017'},
    {headerName: '2/2 Thursday', field: 'th02022017'},
    {headerName: '2/3 Friday', field: 'f02032017'},
    {headerName: '2/4 Saturday', field: 'sa02042017'},
    {headerName: '2/5 Sunday', field: 'su02052017'},
    {headerName: '2/6 Monday', field: 'm02062017'},
    {headerName: '2/7 Tuesday', field: 'tu02072017'}
]

export const rowData = [
    {cabin: '#1', w02012017: 'available', th02022017: 'booked', f02032017: 'available', sa02042017: 'available', su02052017: 'available', m02062017: 'available', tu02072017: 'available'},
    {cabin: '#2', w02012017: 'available', th02022017: 'available', f02032017: 'available', sa02042017: 'available', su02052017: 'available', m02062017: 'available', tu02072017: 'available'},
    {cabin: '#3', w02012017: 'booked', th02022017: 'available', f02032017: 'available', sa02042017: 'booked', su02052017: 'available', m02062017: 'available', tu02072017: 'available'},
    {cabin: '#4', w02012017: 'available', th02022017: 'available', f02032017: 'available', sa02042017: 'available', su02052017: 'available', m02062017: 'available', tu02072017: 'available'}
]

//use this for later, TODO: modify to fit new format
// gridMonthHeader(year, month) {
// 	var elem = [];
// 	var mon = month - 1
// 	var d = new Date(year, mon)
// 	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// 	while(d.getMonth() == mon) {
// 		elem.push({field:'t'+(mon+1) + d.getDate(),headerName:(mon+1) + '/' + d.getDate() + ' ' + dayName[d.getDay()]})
// 		d.setDate(d.getDate()+1)
// 	}
//     console.log('elem', elem)
// 	return elem;
// }
//combine this data to make the reservation grid.