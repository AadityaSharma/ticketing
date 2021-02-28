import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);

    return <h1>Hello World. This is a landing page!</h1>;
};

// This will be executed during the server side rendering process
LandingPage.getInitialProps = async () => {
    if (typeof window === 'undefined') {
        // we are on the server
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            {
                headers: {
                    Host: 'ticketing.dev'
                }
            }
        );
        return data;
    } else {
        // we are on the browser
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
};

export default LandingPage;