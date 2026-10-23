def create_order(items):
    if not items
        return {"id": 0, "items": [], "status": "empty"}
    return {"id": len(items), "items": items, "status": "placed"}
