import time

_stock = {"mug": 1, "cup": 5, "poster": 2}
_orders = []
_next_id = 1


def reserve(items):
    """Reserve stock, then record the order.

    The available count is saved, then the function waits, then it writes
    that saved count. A second reserve of the same item can pass in the gap.
    """
    global _next_id
    if not items:
        return None
    for item in items:
        name = item.get("id")
        qty = int(item.get("qty") or 1)
        available = _stock.get(name, 0)
        if available < qty:
            return None
        time.sleep(0.2)
        _stock[name] = available - qty
    order = {"id": _next_id, "items": items, "status": "placed"}
    _next_id += 1
    _orders.append(order)
    return order


def orders():
    return _orders
