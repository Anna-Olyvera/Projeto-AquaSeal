def test_index_route(client):
    """  Test the index page loads correctly."""
    response = client.get('/')
    assert response.status_code == 200
    assert b'AquaSeal' in response.data


def test_predict_route(client):
    """ Test the predict page loads correctly and Predict works correctly."""
    response = client.post('/predict', data={
        "alcalinidade": 1,
        "amonia": 1,
        "bOD": 1,
        "cloreto": 1,
        "condutividade": 1,
        "oxigenioD": 1,
        "ortofosfato": 1,
        "ph": 1,
        "temperatura": 1,
        "durezaT": 1,
        "corV": 1
    })
    assert response.status_code == 200
    assert b'Water quality: Good' in response.data


def test_predict__data(client):
    """ Test the predict page return a error message when missing data."""
    response = client.post('/predict', data={
        "alcalinidade": 1,
        "amonia": 1,
        "bOD": 1,
        "cloreto": 1,
        "condutividade": 1,
        "oxigenioD": 1,
        "ortofosfato": 1,
        "ph": 1,
        "temperatura": 1,
        "durezaT": 1
    })
    assert response.status_code == 200
    assert b"<h1>Error</h1>" in response.data


def test_predict_no_data(client):
    """ Test the predict page return a error message when no data."""
    response = client.post('/predict', data={})
    assert response.status_code == 200
    assert b"<h1>Error</h1>" in response.data

def test_predict_missing_data(client):
    """ Test the predict page return a error message when missing data."""
    response = client.post('/predict', data={
        "alcalinidade": 1,
        "amonia": 1,
        "bOD": 1,
        "cloreto": 1,
        "condutividade": 1,
        "oxigenioD": 1,
        "ortofosfato": 1,
        "temperatura": 1,
        "durezaT": 1,
        "corV": 1
    })
    assert response.status_code == 200
    assert b"<h1>Error</h1>" in response.data

def test_predict_wrong_data(client):
    """ Test the predict page return a error message when wrong data."""
    response = client.post('/predict', data={
        "alcalinidade": "a",
        "amonia": 1,
        "bOD": 1,
        "cloreto": 1,
        "condutividade": 1,
        "oxigenioD": 1,
        "ortofosfato": 1,
        "ph": 1,
        "temperatura": 1,
        "durezaT": 1,
        "corV": 1
    })
    assert response.status_code == 200
    assert b"<h1>Error</h1>" in response.data