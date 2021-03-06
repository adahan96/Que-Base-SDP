import React from 'react';
import {Typography} from "@material-ui/core";

import CustomContainer from '../custom/CustomContainer';
import UserPreview from "./UserPreview";


/**
 *  User Container
 */

const UserContainer = (props) => {

    const {users, handleRequest, page, header, styles, state} = props;
    const numberOfPages = users['numberOfPages'];

    /**
     *  Rendering the question previews
     */

    const renderUserPreviews = () => {

        const data = users['data'];

        if (data.length === 0)
            return <Typography variant={"h5"}>No results</Typography>;



        return data.map(user => {
            if (state)
                user['state'] = state;

            return (
                <UserPreview
                    key={user['_id']}
                    data={user}
                />
            )
        })
    };

    // Returning the render stuff
    return (
        <CustomContainer header={!header ? "Users" : header}
                         page={page}
                         numberOfPages={numberOfPages}
                         handleRequest={handleRequest}
                         renderPreviews={renderUserPreviews}
                         styles={styles}
        >
        </CustomContainer>
    );
};

// Exporting the component
export default UserContainer
