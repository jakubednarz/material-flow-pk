import bcrypt


def verify_password(plain_password, hashed_password):
    password_byte_enc = plain_password
    return bcrypt.checkpw(password_byte_enc.encode('utf-8') , hashed_password.encode('utf-8'))
