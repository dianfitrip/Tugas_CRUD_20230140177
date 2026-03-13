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
                    // PERBAIKAN: Gunakan pesan statis karena backend tidak mengirim res.message
                    text: isEdit ? 'Data KTP berhasil diperbarui!' : 'Data KTP berhasil ditambahkan!',
                    confirmButtonColor: '#0056b3'
                });
                resetForm();
                loadData();
            },
            error: function(xhr) {
                // PERBAIKAN: Pesan error penanganan validasi duplikat NIK
                let msg = "Terjadi kesalahan saat menyimpan data!";
                if (xhr.status === 500) {
                    msg = "Pastikan Nomor KTP belum digunakan oleh data lain.";
                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    msg = xhr.responseJSON.message;
                }

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

        // PERBAIKAN: Backend mengembalikan array secara langsung ke 'res', bukan 'res.data'
        if(!res || res.length === 0){
            tbody.append(`<tr><td colspan="7" style="text-align:center;">Tidak ada data</td></tr>`);
            return;
        }

        // PERBAIKAN: Looping menggunakan 'res'
        $.each(res, function(index, ktp) {
            // PERBAIKAN: Format tanggal agar tampil rapi di tabel (YYYY-MM-DD)
            let tglLahir = new Date(ktp.tanggalLahir).toISOString().split('T')[0];

            tbody.append(`<tr>
                <td>${index + 1}</td>
                <td>${ktp.nomorKtp}</td>
                <td>${ktp.namaLengkap}</td>
                <td>${ktp.alamat}</td>
                <td>${tglLahir}</td>
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
        // PERBAIKAN: Backend mengembalikan object secara langsung ke 'res', bukan 'res.data'
        let ktp = res;

        $("#idKtp").val(ktp.id);
        $("#nomorKtp").val(ktp.nomorKtp);
        $("#namaLengkap").val(ktp.namaLengkap);
        $("#alamat").val(ktp.alamat);

        // PERBAIKAN: Tanggal dari DB harus diformat ke (YYYY-MM-DD) agar bisa masuk ke <input type="date">
        let tglLahir = new Date(ktp.tanggalLahir).toISOString().split('T')[0];
        $("#tanggalLahir").val(tglLahir);

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
                success: function() {
                    // PERBAIKAN: Hilangkan parameter res dan pakai string manual
                    Swal.fire({
                        title: 'Terhapus!',
                        text: "Data KTP berhasil dihapus.",
                        icon: 'success',
                        confirmButtonColor: '#0056b3'
                    });
                    loadData();
                },
                error: function() {
                    Swal.fire({
                        title: 'Gagal!',
                        text: 'Terjadi kesalahan saat menghapus data.',
                        icon: 'error',
                        confirmButtonColor: '#d6336c'
                    });
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