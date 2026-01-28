function openDeleteModal(itemId) {
  const modal = document.getElementById('deleteModal');
  modal.classList.add('active');
}
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
}

// Cerrar si hacen click fuera de la tarjeta
window.onclick = function(event) {
    const modal = document.getElementById('deleteModal');
    if (event.target == modal) {
        closeDeleteModal();
    }
}