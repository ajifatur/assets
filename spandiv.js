/*
 * Required:
 * JS: JQuery 3.6, Bootstrap 5
 * CSS: Bootstrap 5, Bootstrap Icons
 */


// Call the namespace
var Spandiv = Spandiv || {};

// Object inside namespace
(function(n) {
    // Resources
    n.Resources = {
        "datatables":
            {
                "css": "https://cdn.datatables.net/1.11.3/css/dataTables.bootstrap5.min.css",
                "js" : [
                    "https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js",
                    "https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap5.min.js"
                ]
            },
        "datepicker":
            {
                "css": "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css",
                "js" : "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
            },
        "daterangepicker":
            {
                "css": "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.css",
                "js" : [
                    "https://cdn.jsdelivr.net/momentjs/latest/moment.min.js",
                    "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"
                ]
            },
        "jqueryui":
            {
                "js" : "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            },
        "quill":
            {
                "css": "https://campusdigital.id/assets/plugins/quill/quill.snow.css",
                "js" : [
                    "https://campusdigital.id/assets/plugins/quill/quill.min.js",
                    "https://cdn.rawgit.com/kensnyder/quill-image-resize-module/3411c9a7/image-resize.min.js"
                ]
            },
        "select2":
            {
                "css": "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
                "js" : "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
            },
        "sweetalert2":
            {
                "css": "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css",
                "js" : "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"
            }
    }

    // Enable Everywhere
    n.EnableEverywhere = () => {
        n.Tooltip();
        n.ButtonLogout(".btn-logout", "#form-logout");
        n.ButtonTogglePassword(".btn-toggle-password");
    }

    // // Add Script
    // n.AddScript = (src) => {
    //     var element = document.querySelector("script[src='" + src + "']");
    //     if(element !== null) element.remove();

    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src = src;
    //     document.body.appendChild(script);
    //     return script;
    // }

    // Add Scripts
    n.AddScripts = (src, onSuccess) => {
        var pending = [];
		src = [].concat(src);

        // Loop scripts
        for(i=0; i<src.length; i++) {
            var element = document.querySelector("script[src='" + src[i] + "']");
            if(element !== null) element.remove();

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src[i];
            script.onload = onLoad;
            document.body.appendChild(script);
            pending.push(src[i]);
        }

        // On load
        function onLoad() {
			if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				pending.splice(pending.indexOf(this.src), 1);
				if(!pending.length) {
					onSuccess();
				}
			}
        }
    }

    // Add Stylesheet
    n.AddStylesheet = (src) => {
        var element = document.querySelector("link[href='" + src + "']");
        if(element !== null) element.remove();

        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = src;
        document.head.appendChild(link);
        return link;
    }

    // Button Delete
    n.ButtonDelete = (button, form) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            var id = $(this).data("id");
            $(form).find("input[name=id]").val(id);
            n.SwalWarning("Anda yakin ingin menghapus data ini?", form);
        });
    }

    // Button Logout
    n.ButtonLogout = (button, form) => {
        $(document).on("click", button, function(e) {
            e.preventDefault();
            n.SwalWarning("Anda yakin ingin keluar?", form);
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

    // Bootstrap Tooltip
    n.Tooltip = () => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Bootstrap Toast
    n.Toast = (selector, message) => {
        $(".toast-container").removeClass("d-none");
        $(selector).find(".toast-body").text(message);
        var toast = new bootstrap.Toast(document.querySelector(selector));
        toast.show();
    }

    // SweetAlert2 Warning
    n.SwalWarning = (text, form) => {
        n.AddStylesheet(n.Resources.sweetalert2.css);
        n.AddScripts(n.Resources.sweetalert2.js, function() {
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
    n.DataTable = (selector) => {
        n.AddStylesheet(n.Resources.datatables.css);
        n.AddScripts(n.Resources.datatables.js, function() {
            var datatable = $(selector).DataTable({
                "language": {
                    "lengthMenu": "Menampilkan _MENU_ data",
                    "zeroRecords": "Data tidak tersedia",
                    "info": "Menampilkan _START_ sampai _END_ dari total _TOTAL_ data",
                    "infoEmpty": "Data tidak ditemukan",
                    "infoFiltered": "(Terfilter dari total _MAX_ data)",
                    "search": "Cari:",
                    "paginate": {
                        "first": "Pertama",
                        "last": "Terakhir",
                        "previous": "<",
                        "next": ">",
                    },
                    "processing": "Memproses data..."
                },
                // "fnDrawCallback": configFnDrawCallback,
                "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Semua"]],
                "pageLength": 10,
                columnDefs: [
                    {orderable: false, targets: 0},
                    {orderable: false, targets: -1},
                ],
                order: []
            });
            return datatable;
        });
    }

    // DataTable Server Side
    n.DataTableServerSide = (selector, conf) => {
        n.AddStylesheet(n.Resources.datatables.css);
        n.AddScripts(n.Resources.datatables.js, function() {
            var datatable = $(selector).DataTable({
                processing: true,
                serverSide: true,
                ajax: conf.url,
                columns: conf.columns,
                "language": {
                    "lengthMenu": "Menampilkan _MENU_ data",
                    "zeroRecords": "Data tidak tersedia",
                    "info": "Menampilkan _START_ sampai _END_ dari total _TOTAL_ data",
                    "infoEmpty": "Data tidak ditemukan",
                    "infoFiltered": "(Terfilter dari total _MAX_ data)",
                    "search": "Cari:",
                    "paginate": {
                        "first": "Pertama",
                        "last": "Terakhir",
                        "previous": "<",
                        "next": ">",
                    },
                    "processing": "Memproses data..."
                },
                // "fnDrawCallback": configFnDrawCallback,
                "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Semua"]],
                "pageLength": 10,
                columnDefs: [
                    {orderable: false, targets: 0},
                    {orderable: false, targets: -1},
                ],
                order: [conf.order]
            });
            
            datatable.on('draw.dt', function() {
                n.Tooltip();
            });
            
            return datatable;
        });
    }

    // Quill Editor
    n.Quill = (selector) => {
        n.AddStylesheet(n.Resources.quill.css);
        n.AddScripts(n.Resources.quill.js, function() {
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
    n.DatePicker = (selector) => {
        n.AddStylesheet(n.Resources.datepicker.css);
        n.AddScripts(n.Resources.datepicker.js, function() {
            var datepicker = $(selector).datepicker({
                format: "dd/mm/yyyy",
                todayHighlight: true,
                autoclose: true
            });
            return datepicker;
        });
    }

    // Daterangepicker
    n.DateRangePicker = (selector, time = {}) => {
        n.AddStylesheet(n.Resources.daterangepicker.css);
        n.AddScripts(n.Resources.daterangepicker.js, function() {
            var daterangepicker =  $(selector).daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                showDropdowns: true,
                startDate: time.start !== undefined ? time.start : moment().startOf('hour'),
                endDate: time.end !== undefined ? time.end : moment().startOf('hour').add(48, 'hour'),
                locale: {
                    format: 'DD/MM/YYYY HH:mm'
                }
            });
            return daterangepicker;
        });
    }

    // Select2
    n.Select2 = (selector) => {
        n.AddStylesheet(n.Resources.select2.css);
        n.AddScripts(n.Resources.select2.js, function() {
            var select2 = $(selector).select2({
                width: 'resolve',
                allowClear: true
            });
            return select2;
        });
    }

    // Select2 Server Side
    n.Select2ServerSide = (selector, conf) => {
        $(window).on("load", function() {
            var key = conf.value;
            $.ajax({
                type: "get",
                url: conf.url,
                success: function(response) {
                    var html = '<option value="" disabled selected>--Pilih--</option>';
                    for(var i = 0; i < response.length; i++) {
                        var selected = (key === response[i][conf.valueProp]) ? 'selected' : '';
                        if(conf.bracketProp !== undefined)
                            html += '<option value="' + response[i][conf.valueProp] + '" ' + selected + '>' + response[i][conf.nameProp] + ' (' + response[i][conf.bracketProp] + ')' + '</option>';
                        else
                            html += '<option value="' + response[i][conf.valueProp] + '" ' + selected + '>' + response[i][conf.nameProp] + '</option>';
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
        n.AddScripts(n.Resources.jqueryui.js, function() {
            var sortable = $(selector).sortable({
                items: "> div",
                placeholder: "ui-state-highlight",
                start: function(event, ui) {
                    $(selector).find(".ui-state-highlight").css("height", $(ui.item).outerHeight());
                },
                update: function(event, ui) {
                    var url = $(this).data("url");
                    var items = $(this).find(".ui-sortable-handle");
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

})(Spandiv);
