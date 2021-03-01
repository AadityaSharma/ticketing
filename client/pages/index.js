import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);

    return currentUser ? 
        <h1>You're signed in! Yooohoooo!!!</h1>
        : <h1>You're NOT signed in!</h1>;
};

// This will be executed during the server side rendering process
LandingPage.getInitialProps = async (context) => {
    console.log('LANDING PAGE!!!');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;