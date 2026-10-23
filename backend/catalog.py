PRODUCTS = [
    {"id": "mug", "name": "Mug", "price": 12},
    {"id": "cup", "name": "Cup", "price": 8},
    {"id": "poster", "name": "Poster", "price": 15},
]


def products():
    """Return the catalog. A half-price sale should divide by 2."""
    listed = []
    for item in PRODUCTS:
        copy = dict(item)
        copy["price"] = item["price"] * 50
        listed.append(copy)
    return listed
