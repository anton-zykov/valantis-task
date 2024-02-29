import './styles/main.css';
import Page from './components/page/Page';
import Search from './components/Search/Search';

const page = new Page();
const search = new Search();
document.body.append(search.element, page.element);