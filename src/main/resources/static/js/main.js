const API_URL = "http://localhost:8081/ktp";

$(document).ready(function() {
    let today = new Date().toISOString().split('T')[0];
    $('#tanggalLahir').attr('max', today);

    loadData();

    $("#ktpForm").submit(function(e) {
        e.preventDefault();

        let id = $("#idKtp").val();
        let isEdit = id !== "";
        let data = {
            nomorKtp: $("#nomorKtp").val(),
            namaLengkap: $("#namaLengkap").val(),
            alamat: $("#alamat").val(),
            tanggalLahir: $("#tanggalLahir").val(),
            jenisKelamin: $("#jenisKelamin").val()
        };

        $.ajax({
            url: isEdit ? `${API_URL}/${id}` : API_URL,
            type: isEdit ? "PUT" : "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: res.message,
                    confirmButtonColor: '#0056b3'
                });
                resetForm();
                loadData();
            },
            error: function(xhr) {
                let msg = xhr.responseJSON ? xhr.responseJSON.message : "Terjadi kesalahan!";
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: msg,
                    confirmButtonColor: '#d6336c'
                });
            }
        });
    });

    $("#btnCancel").click(function() {
        resetForm();
    });
});

function loadData() {
    $.get(API_URL, function(res) {
        let tbody = $("#ktpTable tbody");
        tbody.empty();

        if(res.data.length === 0){
            tbody.append(`<tr><td colspan="7" style="text-align:center;">Tidak ada data</td></tr>`);
            return;
        }

        $.each(res.data, function(index, ktp) {
            tbody.append(`<tr>
                <td>${index + 1}</td>
                <td>${ktp.nomorKtp}</td>
                <td>${ktp.namaLengkap}</td>
                <td>${ktp.alamat}</td>
                <td>${ktp.tanggalLahir}</td>
                <td>${ktp.jenisKelamin}</td>
                <td>
                    <button class="btn-edit" onclick="editData(${ktp.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteData(${ktp.id})">Hapus</button>
                </td>
            </tr>`);
        });
    });
}

window.editData = function(id) {
    $.get(`${API_URL}/${id}`, function(res) {
        let ktp = res.data;
        $("#idKtp").val(ktp.id);
        $("#nomorKtp").val(ktp.nomorKtp);
        $("#namaLengkap").val(ktp.namaLengkap);
        $("#alamat").val(ktp.alamat);
        $("#tanggalLahir").val(ktp.tanggalLahir);
        $("#jenisKelamin").val(ktp.jenisKelamin);

        $("#btnSave").text("Update Data");
        $("#btnCancel").show();
        $("html, body").animate({ scrollTop: 0 }, "fast");
    });
};

window.deleteData = function(id) {
    Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data KTP ini akan dihapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d6336c',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${API_URL}/${id}`,
                type: "DELETE",
                success: function(res) {
                    Swal.fire({
                        title: 'Terhapus!',
                        text: res.message,
                        icon: 'success',
                        confirmButtonColor: '#0056b3'
                    });
                    loadData();
                }
            });
        }
    });
};

function resetForm() {
    $("#ktpForm")[0].reset();
    $("#idKtp").val("");
    $("#btnSave").text("Simpan Data");
    $("#btnCancel").hide();
}