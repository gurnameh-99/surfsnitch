def clean_data(data):
    return {k: v for k, v in data.items() if v > 0}
