/*
 * Required:
 * JS: JQuery 3.6, Bootstrap 5, DataTable
 * CSS: Bootstrap 5, Bootstrap Icons, DataTable
 */


// Call the namespace
var Spandiv = Spandiv || {};

// Object inside namespace
(function(n) {
    // Resources
    n.Resources = {
        "clockpicker": {
            "css": "https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.min.css",
            "js" : "https://cdnjs.cloudflare.com/ajax/libs/clockpicker/0.0.7/bootstrap-clockpicker.min.js"
        },
        "croppie": {
            "css": "https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.css",
            "js" : "https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.js"
        },
        "datepicker": {
            "css": "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css",
            "js" : "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
        },
        "magnificpopup": {
            "css": "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css",
            "js" : "https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"
        },
        "pace": {
            "css": "https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css",
            "js" : "https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"
        },
        "jqueryui": {
            "js" : "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
        },
        "quill": {
            "css": "https://ajifatur.github.io/assets/external/quill/quill.snow.css",
            "js" : [
                "https://ajifatur.github.io/assets/external/quill/quill.min.js",
                "https://cdn.rawgit.com/kensnyder/quill-image-resize-module/3411c9a7/image-resize.min.js"
            ]
        },
        "select2": {
            "css": "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
            "js" : "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
        },
        "sweetalert2": {
            "css": "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
            "js" : "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"
        }
    }

    // Enable Everywhere
    n.EnableEverywhere = () => {
        n.Pace();
        n.Tooltip();
        n.Popover();
        n.ButtonLogout(".btn-logout", "#form-logout");
        n.ButtonTogglePassword(".btn-toggle-password");
    }

    // Load Resources
    n.LoadResources = (resources, onSuccess = null) => {
        var pending = [];
        var css = [].concat(resources.css);
        var js = [].concat(resources.js);

        if(resources.css !== undefined) {
            // Loop stylesheets
            for(i=0; i<css.length; i++) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = css[i];
                link.onload = onLoad;
                document.head.appendChild(link);
                pending.push(css[i]);
            }
        }

        if(resources.js !== undefined) {
            // Loop scripts
            for(i=0; i<js.length; i++) {    
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = js[i];
                script.onload = onLoad;
                document.body.appendChild(script);
                pending.push(js[i]);
            }
        }

        // On load
        function onLoad() {
            if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                if(this.href !== undefined) pending.splice(pending.indexOf(this.href), 1);
                if(this.src !== undefined) pending.splice(pending.indexOf(this.src), 1);
                if(!pending.length) {
                    if(onSuccess !== null) onSuccess();
                    removeElements();
                }
            }
        }

        // Remove duplicate elements
        function removeElements() {
            // Remove duplicate stylesheets
            if(css.length > 0) {
                for(i=0; i<css.length; i++) {
                    var elements = document.querySelectorAll("link[href='" + css[i] + "']");
                    if(elements.length > 1) {
                        for(j=1; j<elements.length; j++) {
                            elements[j].remove();
                        }
                    }
                }
            }

            // Remove duplicate scripts
            if(js.length > 0) {
                for(i=0; i<js.length; i++) {
                    var elements = document.querySelectorAll("script[src='" + js[i] + "']");
                    if(elements.length > 1) {
                        for(j=1; j<elements.length; j++) {
                            elements[j].remove();
                        }
                    }
                }
            }
        }
    }

    // Button Delete
    n.ButtonDelete = (button, form) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            var id = $(this).data("id");
            $(form).find("input[name=id]").val(id);
            n.Confirm("Anda yakin ingin menghapus data ini?", form);
        });
    }

    // Button Delete Bulk
    n.ButtonDeleteBulk = (button, form) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            var ids = [];
            var checked = $(".dataTable .checkbox-one:checked");
            if(checked.length > 0) {
                $(checked).each(function(key,elem) {
                    ids.push($(elem).data("id"));
                });
                $(form).find("input[name=ids]").val(ids);
                n.Confirm("Anda yakin ingin menghapus data yang terpilih?", form);
            }
            else
                n.Alert("Tidak ada data yang terpilih!");
        });
    }

    // Button Logout
    n.ButtonLogout = (button, form) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            n.Confirm("Anda yakin ingin keluar?", form);
        });
    }

    // Button Toggle Password
    n.ButtonTogglePassword = (button) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            var type = $(this).parents(".input-group").find("input").attr("type");
            var icon = $(this).parents(".input-group").find("i").attr("class");
            type === "password" ? $(this).parents(".input-group").find("input").attr("type","text") : $(this).parents(".input-group").find("input").attr("type","password");
            icon === "bi-eye" ? $(this).parents(".input-group").find("i").attr("class","bi-eye-slash") : $(this).parents(".input-group").find("i").attr("class","bi-eye");
        });
    }

    // Checkbox One
    n.CheckboxOne = () => {
        $(document).on("click", ".dataTable .checkbox-one", function() {
            $(".dataTable .checkbox-all").prop("checked", false);
        });
    }

    // Checkbox All
    n.CheckboxAll = () => {
        $(document).on("click", ".dataTable .checkbox-all", function() {
            $(this).prop("checked") ? $(".dataTable .checkbox-one").prop("checked", true) : $(".dataTable .checkbox-one").prop("checked", false);
        });
    }

    // Generate URL
    n.URL = (url, params = {}) => {
        if(Object.keys(params).length === 0)
            return url;
        else {
            var keys = Object.keys(params);
            var values = Object.values(params);
            var query = "";
            for(i=0; i<keys.length; i++) {
                query += keys[i] + "=" + values[i];
                if(i + 1 !== keys.length) query += "&";
            }
            return url + "?" + query;
        }
    }

    // Number Format
    n.NumberFormat = (value) => {
        var number_string = value.replace(/[^.\d]/g, '').toString();
        var split = number_string.split('.');
        var mod = split[0].length % 3;
        var rupiah = split[0].substr(0, mod);
        var thousand = split[0].substr(mod).match(/\d{3}/gi);

        if(thousand) {
            separator = mod ? ',' : '';
            rupiah += separator + thousand.join(',');
        }

        return rupiah = split[1] != undefined ? rupiah + '.' + split[1] : rupiah;
    }

    // Bootstrap Modal
    n.Modal = (selector) => {
        var modal = bootstrap.Modal.getOrCreateInstance(document.querySelector(selector));
        return modal;
    }

    // Bootstrap Tooltip
    n.Tooltip = () => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Bootstrap Popover
    n.Popover = () => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl, {html: true});
        });
    }

    // Bootstrap Toast
    n.Toast = (selector, text) => {
        $(".toast-container").removeClass("d-none");
        $(selector).find(".toast-body").text(text);
        var toast = new bootstrap.Toast(document.querySelector(selector));
        toast.show();
    }

    // Bootstrap Tab
    n.Tab = (selector) => {
        var tab = bootstrap.Tab.getOrCreateInstance(document.querySelector(selector));
        return tab;
    }

    // SweetAlert2 Alert
    n.Alert = (text) => {
        n.LoadResources(n.Resources.sweetalert2, function() {
            Swal.fire({
                text: text,
                icon: "warning",
                allowOutsideClick: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
        });
    }

    // SweetAlert2 Confirm
    n.Confirm = (text, form) => {
        n.LoadResources(n.Resources.sweetalert2, function() {
            Swal.fire({
                text: text,
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Batal",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33"
            }).then((result) => {
                if(result.isConfirmed) {
                    $(form).submit();
                }
            });
        });
    }

    // DataTable
    n.DataTable = (selector, options = {}) => {
        // Define the columnDefs
        var columnDefs = [
            {orderable: false, targets: 0},
            {orderable: false, targets: -1},
        ];
        if(options.orderAll === true)
            columnDefs = [];

        // Define fixedColumns
        var fixedColumns = {
            left: options.fixedColumns !== undefined && options.fixedColumns.left ? options.fixedColumns.left : 0,
            right: options.fixedColumns !== undefined && options.fixedColumns.right !== undefined ? options.fixedColumns.right : 0
        }

        // Define buttons
        var buttons = [
            {
                extend: "excel",
                text: '<i class="bi-file-excel"></i> Excel',
                className: "btn-datatable",
                exportOptions: {
                    columns: "th:not(.notexport)"
                },
                autoFilter: true
            }
        ];
        if(options.deleteBulk === true) {
            buttons.push({
                text: '<i class="bi-trash"></i> Hapus Terpilih',
                className: "btn-datatable btn-delete-bulk"
            });
        }

        // Define datatable
        var datatable = $(selector).DataTable({
            scrollX: true,
            scrollCollapse: true,
            processing: options.serverSide !== undefined ? options.serverSide : false,
            serverSide: options.serverSide !== undefined ? options.serverSide : false,
            ajax: options.url !== undefined && options.serverSide === true ? options.url : null,
            columns: options.columns !== undefined && options.serverSide === true ? options.columns : null,
            language: {
                lengthMenu: "Menampilkan _MENU_ data",
                zeroRecords: "Data tidak tersedia",
                info: "Menampilkan _START_ sampai _END_ dari total _TOTAL_ data",
                infoEmpty: "Data tidak ditemukan",
                infoFiltered: "(Terfilter dari total _MAX_ data)",
                search: "",
                searchPlaceholder: "Cari...",
                paginate: {
                    first: "Pertama",
                    last: "Terakhir",
                    previous: "<",
                    next: ">",
                },
                processing: "Memproses data..."
            },
            aLengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Semua"]],
            pageLength: options.pageLength !== undefined ? options.pageLength : 10,
            rowsGroup: options.rowsGroup !== undefined ? options.rowsGroup : null,
            orderCellsTop: true,
            fixedHeader: options.fixedHeader !== undefined ? options.fixedHeader : false,
            fixedColumns: fixedColumns,
            columnDefs: columnDefs,
            order: options.order !== undefined && options.serverSide === true ? [options.order] : [],
            dom: options.buttons !== undefined && options.buttons === true ? '<"top"lfB>rt<"bottom"ip>' : '<"top"lf>rt<"bottom"ip>',
            buttons: buttons
        });

        // Redraw
        if(options.serverSide === true) {
            datatable.on('draw.dt', function() {
                n.Tooltip();
            });
        }

        // Checkbox
        n.CheckboxOne();
        n.CheckboxAll();

        // Return
        return datatable;
    }

    // Quill Editor
    n.Quill = (selector) => {
        n.LoadResources(n.Resources.quill, function() {
            var quill;
            if($(selector).length === 1) {
                quill = new Quill(selector, {
                    modules: {
                        toolbar: [
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{'script': 'sub'}, {'script': 'super'}],
                            ['link', 'image'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'align': [] }],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'color': []}, {'background': []}],
                            ['clean']
                        ],
                        imageResize: {
                            displaySize: true
                        }
                    },
                    placeholder: 'Tulis sesuatu...',
                    theme: 'snow',
                    readOnly: false
                });
            }
            return quill;
        });
    }

    // Datepicker
    n.DatePicker = (selector, format = "dd/mm/yyyy") => {
        n.LoadResources(n.Resources.datepicker, function() {
            $.fn.datepicker.dates['id'] = {
                days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
                daysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                daysMin: ["Mi", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa"],
                months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
                today: "Hari Ini",
                clear: "Hapus",
                format: format,
                titleFormat: "MM yyyy",
                weekStart: 0
            };

            var datepicker = $(selector).datepicker({
                language: "id",
                format: format,
                todayHighlight: true,
                autoclose: true
            });

            return datepicker;
        });
    }

    // Daterangepicker
    n.DateRangePicker = (selector, time = {}) => {
        var daterangepicker =  $(selector).daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            startDate: time.start !== undefined ? time.start : moment().startOf('hour'),
            endDate: time.end !== undefined ? time.end : moment().startOf('hour').add(48, 'hour'),
            locale: {
                format: 'DD/MM/YYYY HH:mm',
                applyLabel: 'OK',
                cancelLabel: 'Batal',
                fromLabel: 'Dari',
                toLabel: 'Sampai',
                customRangeLabel: 'Kustom',
                daysOfWeek: [
                    "Mi",
                    "Sn",
                    "Sl",
                    "Ra",
                    "Ka",
                    "Ju",
                    "Sa"
                ],
                monthNames: [
                    "Januari",
                    "Februari",
                    "Maret",
                    "April",
                    "Mei",
                    "Juni",
                    "Juli",
                    "Agustus",
                    "September",
                    "Oktober",
                    "November",
                    "Desember"
                ]
            }
        });
        return daterangepicker;
    }

    // ClockPicker
    n.ClockPicker = (selector) => {
        n.LoadResources(n.Resources.clockpicker, function() {
            var clockpicker = $(selector).clockpicker({
                autoclose: true
            });
            return clockpicker;
        });
    }

    // Select2
    n.Select2 = (selector) => {
        n.LoadResources(n.Resources.select2, function() {
            var select2 = $(selector).select2({
                width: 'resolve',
                allowClear: true
            });
            return select2;
        });
    }

    // Select2 Server Side
    n.Select2ServerSide = (selector, options) => {
        $(window).on("load", function() {
            var key = options.value;
            $.ajax({
                type: "get",
                url: options.url,
                success: function(response) {
                    var html = '<option value="" disabled selected>--Pilih--</option>';
                    for(var i = 0; i < response.length; i++) {
                        var selected = (key === response[i][options.valueProp]) ? 'selected' : '';
                        if(options.bracketProp !== undefined)
                            html += '<option value="' + response[i][options.valueProp] + '" ' + selected + '>' + response[i][options.nameProp] + ' (' + response[i][options.bracketProp] + ')' + '</option>';
                        else
                            html += '<option value="' + response[i][options.valueProp] + '" ' + selected + '>' + response[i][options.nameProp] + '</option>';
                    }
                    $(selector).html(html);
                }
            });
        });
        return n.Select2(selector);
    }

    // Sortable
    n.Sortable = (selector) => {
        var token = $("input[name=_token]").val();
        n.LoadResources(n.Resources.jqueryui, function() {
            var sortable = $(selector).sortable({
                items: "> div:not(.ui-state-disabled)",
                placeholder: "ui-state-highlight",
                start: function(event, ui) {
                    $(this).find(".ui-state-highlight").css({
                        "height": $(ui.item).outerHeight(),
                        "margin-bottom": $(this).find(".ui-sortable-handle").css("margin-bottom")
                    });
                },
                update: function(event, ui) {
                    var url = $(this).data("url");
                    var items = $(this).children(".ui-sortable-handle");
                    var ids = [];
                    $(items).each(function(key, elem) {
                        ids.push($(elem).data("id"));
                    });
                    $.ajax({
                        type: "post",
                        url: url,
                        data: {_token: token, ids: ids},
                        success: function(response) {
                            Spandiv.Toast("#toast-sort", response);
                        }
                    });
                }
            });
            $(selector).disableSelection();
            return sortable;
        });
    }

    // Pace
    n.Pace = () => {
        n.LoadResources(n.Resources.pace);
    }

    // Croppie
    n.Croppie = (selector, options) => {
        var croppie = $(selector).croppie({
            viewport: {width: options.width, height: options.height, type: options.type == 'square' || options.type == 'circle' ? options.type : 'square'},
            boundary: {width: options.width, height: options.height}
        });
        return croppie;
    }

    // Croppie Bind From URL
    n.CroppieBindFromURL = (croppieObject, input) => {
        if(input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                croppieObject.croppie('bind', {
                    url: e.target.result
                });
            }
            reader.readAsDataURL(input.files[0]);
            input.value = null;
        }
    }

    // Croppie Submit
    n.CroppieSubmit = (croppieObject, form) => {
        croppieObject.croppie('result', {
            type: 'base64',
            circle: false
        }).then(function(response) {
            $(form).find("input[name=image]").val(response);
            $(form).submit();
        });
    }

    // Magnific Popup
    n.MagnificPopup = (selector) => {
        n.LoadResources(n.Resources.magnificpopup, function() {
            var magnificpopup = $(selector).magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
                image: {
                    titleSrc: 'title'
                }
            });
            return magnificpopup;
        });
    }

    // Highchart.js Pie Chart
    n.HighchartsPie = (selector, options) => {
        var hc = Highcharts.chart(selector, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: options.title,
                align: options.titleAlign !== undefined ? options.titleAlign : 'center'
            },
            subtitle: {
                text: options.subtitle !== undefined ? options.subtitle : '',
                align: options.titleAlign !== undefined ? options.titleAlign : 'center'
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                '{series.name}: <b>{point.y}' + (options.valueSuffix !== undefined ? ' ' + options.valueSuffix : '') + '<b> ({point.percentage:.0f}%)'
            },
            accessibility: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y}' + (options.valueSuffix !== undefined ? ' ' + options.valueSuffix : '')
                    }
                }
            },
            series: [{
                name: options.seriesName,
                colorByPoint: true,
                data: options.data
            }]
        });
        return hc;
    }

    // Execute EnableEverywhere Method
    n.EnableEverywhere();

})(Spandiv);
