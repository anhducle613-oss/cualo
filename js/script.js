document.addEventListener("DOMContentLoaded", function () {
  const modalElement = document.getElementById("bookingModal");
  const bookingModal = modalElement ? new bootstrap.Modal(modalElement) : null;

  const modalHotelName = document.getElementById("modalHotelName");
  const customerName = document.getElementById("customerName");
  const customerPhone = document.getElementById("customerPhone");
  const checkinDate = document.getElementById("checkinDate");
  const nightsInput = document.getElementById("nightsInput");
  const totalPrice = document.getElementById("totalPrice");
  const bookingMessage = document.getElementById("bookingMessage");
  const confirmBookingBtn = document.getElementById("confirmBookingBtn");

  let currentPricePerNight = 0;

  function formatVND(amount) {
    return amount.toLocaleString("vi-VN") + " đ";
  }

  function updateTotal() {
    const nights = Number(nightsInput.value);
    if (!Number.isInteger(nights) || nights <= 0) {
      totalPrice.textContent = "0 đ";
      return;
    }
    const sum = currentPricePerNight * nights;
    totalPrice.textContent = formatVND(sum);
  }

  const bookButtons = document.querySelectorAll("#stay .card .btn-primary");
  bookButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const hotelName = btn.getAttribute("data-hotel") || "";
      currentPricePerNight = Number(btn.getAttribute("data-price")) || 0;

      modalHotelName.textContent = hotelName;
      nightsInput.value = 1;
      bookingMessage.textContent = "";
      bookingMessage.className = "mt-3 small";
      updateTotal();

      if (bookingModal) {
        bookingModal.show();
      }
    });
  });

  if (nightsInput) {
    nightsInput.addEventListener("input", updateTotal);
  }

  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", function () {
      const nameVal = customerName.value.trim();
      const phoneVal = customerPhone.value.trim();
      const dateVal = checkinDate.value;
      const nightsVal = Number(nightsInput.value);

      if (nameVal === "" || phoneVal === "" || dateVal === "") {
        bookingMessage.textContent = "Vui lòng nhập đầy đủ họ tên, số điện thoại và ngày nhận phòng.";
        bookingMessage.className = "mt-3 small text-danger fw-semibold";
        return;
      }

      if (!Number.isInteger(nightsVal) || nightsVal <= 0) {
        bookingMessage.textContent = "Số đêm không hợp lệ. Vui lòng nhập số nguyên lớn hơn 0.";
        bookingMessage.className = "mt-3 small text-danger fw-semibold";
        return;
      }

      const total = currentPricePerNight * nightsVal;
      bookingMessage.textContent =
        "Đặt phòng thành công tại " +
        modalHotelName.textContent +
        " (" +
        nightsVal +
        " đêm) - Tổng tiền: " +
        formatVND(total) +
        ".";
      bookingMessage.className = "mt-3 small text-success fw-semibold";
    });
  }
});
