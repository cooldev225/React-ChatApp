$(document).ready(() => {
    $('#direct_chat .add_contact_user').on('click', () => {
        let contactorInfo = getCertainUserInfoById(currentContactId);
        if (contactorInfo.email) {
            addContact(contactorInfo.email);
        }
    });
});