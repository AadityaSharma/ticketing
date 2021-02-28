import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);

    return <h1>Hello World. This is a landing page!</h1>;
};

// This will be executed during the server side rendering process
LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;