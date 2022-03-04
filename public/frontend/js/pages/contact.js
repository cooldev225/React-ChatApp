$(document).ready(() => {
    $('#chating .add_contact_user').on('click', () => {
        let contactorInfo = getCertainUserInfoById(currentContactId);
        if (contactorInfo.email) {
            addContact(contactorInfo.email);
        }
    });
});