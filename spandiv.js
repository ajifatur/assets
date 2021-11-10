/*
 * Required:
 * JS: JQuery 3.5, Bootstrap 5
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
                "js1": "https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js",
                "js2": "https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap5.min.js"
            },
        "datepicker":
            {
                "css": "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css",
                "js" : "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"
            },
        "daterangepicker":
            {
                "css": "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.css",
                "js1": "https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js",
                "js2": "https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"
            },
        "jqueryui":
            {
                "js" : "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            },
        "quill":
            {
                "css": "https://campusdigital.id/assets/plugins/quill/quill.snow.css",
                "js1": "https://campusdigital.id/assets/plugins/quill/quill.min.js",
                "js2": "https://cdn.rawgit.com/kensnyder/quill-image-resize-module/3411c9a7/image-resize.min.js"
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

    // Add Script
    n.AddScript = (src) => {
        var script = document.createElement("script");
        script.src = src;
        document.body.appendChild(script);
        return script;
    }

    // Add Stylesheet
    n.AddStylesheet = (src) => {
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
        var script = n.AddScript(n.Resources.sweetalert2.js);
        script.onload = function() {
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
        }
    }

    // DataTable
    n.DataTable = (selector) => {
        n.AddStylesheet(n.Resources.datatables.css);
        n.AddScript(n.Resources.datatables.js1);
        var script = n.AddScript(n.Resources.datatables.js2);
        script.onload = function() {
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
        }
    }

    // Quill Editor
    n.Quill = (selector) => {
        n.AddStylesheet(n.Resources.quill.css);
        var script1 = n.AddScript(n.Resources.quill.js1);
        var script2 = n.AddScript(n.Resources.quill.js2);
        script1.onload = function() {
            script2.onload = function() {
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
            }
        }
    }

    // Datepicker
    n.DatePicker = (selector) => {
        n.AddStylesheet(n.Resources.datepicker.css);
        var script = n.AddScript(n.Resources.datepicker.js);
        script.onload = function() {
            var datepicker = $(selector).datepicker({
                format: "dd/mm/yyyy",
                todayHighlight: true,
                autoclose: true
            });
            return datepicker;
        };
    }

    // Daterangepicker
    n.DateRangePicker = (selector, time = {}) => {
        n.AddStylesheet(n.Resources.daterangepicker.css);
        n.AddScript(n.Resources.daterangepicker.js2);
        var script = n.AddScript(n.Resources.daterangepicker.js1);
        script.onload = function() {
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
        }
    }

    // Select2
    n.Select2 = (selector) => {
        n.AddStylesheet(n.Resources.select2.css);
        var script = n.AddScript(n.Resources.select2.js);
        script.onload = function() {
            var select2 = $(selector).select2({
                width: 'resolve',
                allowClear: true
            });
            return select2;
        };
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
    n.Sortable = (selector, update) => {
        var script = n.AddScript(n.Resources.jqueryui.js);
        script.onload = function() {
            $(selector).sortable({
                placeholder: "ui-state-highlight",
                start: function(event, ui){
                    $(".ui-state-highlight").css("height", $(ui.item).outerHeight());
                },
                update: update
            });
            $(selector).disableSelection();
        }
    }

})(Spandiv);