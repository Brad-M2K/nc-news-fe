import './ErrorPage.css';

function ErrorPage({ message }) {
    return (
        <div className="error-container">
            <h2>Error</h2>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage;