import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


function ProtectedRoute({component:Component, ...rest}) {
    return (
        <div>
            <Route {...rest} render={
                (props) => {
                    if(rest.isAuthenticated && rest.token){
                        return <Component {...props}/>
                    } else {
                        return <Redirect to = {
                            {
                                pathname: '/',
                                state:{
                                    from:props.location
                                }
                            }
                        }
                        />
                    }
                }
            }/>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated:state.isAuthenticated,
        token:state.token
    }
}

export default connect(mapStateToProps)(ProtectedRoute)
