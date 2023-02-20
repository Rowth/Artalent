export const isValidEmail = email => {
  if (email.split('@')[0].length >= 3) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } else {
    return false;
  }
};
export const isValidPhone = phone => {
  // phone = phone.replace(/[^0-9]/g, '');
  // var regex = /^[0-9.,]+$/;
  // console.log(phone, regex.test(phone), phone.search('.'), phone.search(','));
  // console.log(phone);
  if (phone.length === 10) {
    return true;
  } else {
    return false;
  }
};

export const isValidName = name => {
  if (isOnlyWhitespace(name)) {
    return /^[A-Za-z ]+$/.test(name);
  } else {
    return false;
  }
};

export const isOnlyWhitespace = name => {
  if (name.match(/^\s+$/) === null) {
    return true;
  } else {
    return false;
  }
};
export const isPasswordValid = password => {
  if (isOnlyWhitespace(password)) {
    return password.length >= 6 ? true : false;
  } else {
    return false;
  }
};
export const isValidAddress = address => {
  if (isOnlyWhitespace(address)) {
    return address.length >= 6 ? true : false;
  } else {
    return false;
  }
};
