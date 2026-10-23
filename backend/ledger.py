import time

balance = 100


def withdraw(amount):
    """Take amount from the shared balance.

    Two overlapping calls can both read the same balance, both pass the
    check, and both write their own result.
    """
    global balance
    current = balance
    if amount is None or current < amount:
        return False, current
    time.sleep(0.2)
    balance = current - amount
    return True, balance
