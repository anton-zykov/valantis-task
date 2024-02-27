import './styles/main.css';
import APIRequest from './services/requests';

const data = {
	"action": "get_ids",
	"params": {"offset": 10, "limit": 3}
};

APIRequest(data).then((response) => {
	document.getElementById('test-block').innerHTML = JSON.stringify(response);
});