/*
 * Required:
 * JS: JQuery 3.5, Bootstrap 5, DataTables, Quill Editor, Datepicker, Daterangepicker, Moment JS, JQuery UI
 * CSS: Bootstrap 5, Bootstrap Icons, DataTables, Quill Editor, Datepicker, Daterangepicker
 */


// Call the namespace
var Spandiv = Spandiv || {};

// Object inside namespace
(function(n) {
    // Enable Everywhere
    n.EnableEverywhere = () => {
        n.Tooltip();
        n.ButtonLogout(".btn-logout", "#form-logout");
        n.ButtonTogglePassword(".btn-toggle-password");
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

    // DataTable
    n.DataTable = (selector) => {
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

    // Quill Editor
    n.Quill = (selector) => {
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

    // Datepicker
    n.DatePicker = (selector) => {
        var datepicker = $(selector).datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true,
            autoclose: true
        });
        return datepicker;
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
                format: 'DD/MM/YYYY HH:mm'
            }
        });
        return daterangepicker;
    }

    // Sortable
    n.Sortable = (selector, update) => {
        $(selector).sortable({
            placeholder: "ui-state-highlight",
            start: function(event, ui){
                $(".ui-state-highlight").css("height", $(ui.item).outerHeight());
            },
            update: update
        });
        $(selector).disableSelection();
    }

})(Spandiv);