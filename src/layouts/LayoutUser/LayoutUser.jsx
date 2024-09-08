import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

import './LayoutUser.scss';
import { useAuth } from '../../hooks';
import { Link } from 'react-router-dom';

const items = [
    ['/user/characters', 'Characters'],
    ['/user/location', 'Locations'],
    ['/user/episode', 'Episode'],
].map((data, index) => ({
    key: String(index + 1),
    label: (
        <Link to={data[0]}>
            {data[1]}
        </Link>
    ),
}));
const LayoutUser = (props) => {
    const {children} = props;
    
    const {logout} = useAuth();
    
    return (
        <Layout hasSider>
            <Sider className='sider-bar'>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout style={{marginInlineStart: 200,}}>
                <Header className='headerme'>
                    <Button type='primaty' className="button-logout" onClick={() => logout()}>Logout</Button>
                </Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export {LayoutUser};

LayoutUser.propTypes = {
    children: PropTypes.any,
}