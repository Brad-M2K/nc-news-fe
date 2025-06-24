

import { useParams } from 'react-router-dom';

function SingleArticle() {
    const { article_id } = useParams();

    return <h2>Single Article ID: {article_id}</h2>;
}

export default SingleArticle;