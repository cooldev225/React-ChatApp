const db = require("./config.js");
const SpanishCountries = require("./constant").SpanishCountries;
const KindConstant = require("./constant").KindConstant;
const axios = require('axios');

exports.sendPaySMS = (sender, recipient, amount) => {
    db.query(`SELECT * FROM users where id = ${recipient}`, (error, row) => {
        if (row.length) {
            if (row[0].notification) {
                // var val = Math.floor(100000 + Math.random() * 900000);
                let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                let isoCode2 = row[0].national.toUpperCase();
                db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {
                    db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                        let prefix = phoneInfo[0].intl_dialing_prefix
                        let phone_code = phoneInfo[0].phone_code
                        let fullPhoneNumber = '';
                        if (phone_code != 1) {
                            fullPhoneNumber = '011' + phone_code + phoneNumber;
                        } else {
                            fullPhoneNumber = phone_code + phoneNumber;
                        }
                        db.query(`SELECT * FROM users where id=${sender}`, (error, user) => {
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            if (spainish) {
                                // var message = `Hola ${row[0].username}, you have got cash! You have received $${amount} from ${user[0].username} on OJO.`;
                                var message = `Hola, ${row[0].username}, tienes efectivo!  Has recibido $${amount} de ${user[0].username} en OJO.`;
                            } else {
                                var message = `Hey ${row[0].username}, you\u0027ve got cash! You have received $${amount} from ${user[0].username} on OJO.`;
                            }
                            this.sendSMSFinal(fullPhoneNumber, message, row[0].sms_type);
                        });
                    });
                });
            }
        }
    });
}

exports.sendRateSMS = (sender, recipient, rate, kindIndex) => {
    db.query(`SELECT * FROM users where id = ${recipient}`, (error, row) => {
        if (row.length) {
            if (row[0].notification) {
                // var val = Math.floor(100000 + Math.random() * 900000);
                let phoneNumber = row[0].phone_number.replace(/[^0-9]/g, '');
                let isoCode2 = row[0].national.toUpperCase();
                db.query(`SELECT * FROM countries where iso_code2 = '${isoCode2}'`, (error, country) => {
                    db.query(`SELECT * FROM country_phone_codes where country_id = ${country[0].id}`, (error, phoneInfo) => {
                        let prefix = phoneInfo[0].intl_dialing_prefix
                        let phone_code = phoneInfo[0].phone_code
                        let fullPhoneNumber = '';
                        if (phone_code != 1) {
                            fullPhoneNumber = '011' + phone_code + phoneNumber;
                        } else {
                            fullPhoneNumber = phone_code + phoneNumber;
                        }
                        db.query(`SELECT * FROM users where id=${sender}`, (error, user) => {
                            let spainish = SpanishCountries.map(item => item.toLowerCase()).includes(country[0].name.toLowerCase());
                            let countStar = '';
                            for (let i = 0; i < rate; i++) {
                                countStar += '*';
                                // countStar += '\u2B50';
                                // countStar += '⭐️⭐️⭐️⭐️⭐️';
                            }
                            let type = KindConstant[kindIndex];
                            let messageType = type == 'text' ? 'un mensaje de texto' : type == 'photo' ? 'una foto' : 'solicitar';
                            if (spainish) {
                                var message = `Hola ${row[0].username}, ${user[0].username} acaba de darte ${countStar} en ${messageType} en OJO.`;
                            } else {
                                var message = `Hey ${row[0].username}, ${user[0].username} just rated you ${countStar} on a ${type} message at OJO.`;
                            }
                            this.sendSMSFinal(fullPhoneNumber, message, row[0].sms_type);
                        });
                    });
                });
            }
        }
    });
}

exports.sendSMSFinal = (phoneNumber, message, smsType) => {
    if (smsType == 1) {
        var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${phoneNumber}&message=${message}&devices=%5B%2237%22%2C%2238%22%5D&type=sms&useRandomDevice=1&prioritize=1`;
    } else {
        var smsUrl = `https://app.centsms.app/services/send.php?key=52efd2c71f080fa8d775b2a5ae1bb03cbb599e2f&number=${phoneNumber}&message=${message}&devices=58&type=sms&prioritize=1`;
    }
    axios.get(smsUrl).then(res => {
        console.log("Status: ", res.data.success);
        console.log("Content: ", res.data);
    }).catch(error => {
        console.log(error);
    });
}