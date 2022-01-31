$(window).on("load", function() {
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    var lists = [
        {url: 'clockpicker.html', name: 'ClockPicker'},
        {url: 'datepicker.html', name: 'DatePicker'},
        {url: 'daterangepicker.html', name: 'DateRangePicker'},
        {url: 'datatables.html', name: 'DataTables'},
        {url: 'quill.html', name: 'Quill'},
        {url: 'select2.html', name: 'Select2'},
        {url: 'sweetalert2.html', name: 'SweetAlert2'},
    ];
    var html = '';
    for(i=0; i<lists.length; i++) {
        var active = (filename == lists[i].url) ? 'active' : '';
        html += '<a href="' + lists[i].url + '" class="list-group-item list-group-item-action ' + active + '">' + lists[i].name + '</a>';
    }
    $("aside .list-group").html(html);
});