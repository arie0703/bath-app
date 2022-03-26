import React, { Component } from 'react';
import MenuCard from './MenuCard';
import Box from '@mui/material/Box';
import { auth, db } from '../firebase';



class MenuList extends Component {
    constructor() {
        super()
        const menus = []
        this.state = {
          menus: menus,
        }
    }

    getData = async () =>{
        const ref = db.collection("menus");
        const snapshots = await ref.get();
        const docs = snapshots.docs.map(doc => doc.data());
        await this.setState({
          menus: docs,
        });
    }

    onCollectionUpdate = (querySnapshot) => {
        //変更の発生源を特定 local:自分, server:他人
        // const source = querySnapshot.metadata.hasPendingWrites ? "local" : "server";
        // if (source === 'local')  this.getData(); //期待した動きをしない
        this.getData();
    }

    componentDidMount = async () => {
        //mount時に読み込む
        await this.getData();
        //collectionの更新を監視
        this.unsubscribe = db.collection("menus").onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }


    render() {
        const menus = this.state.menus.map( menu =>
        <MenuCard
            key={menu.id}
            {...menu}
        />
        )

        return(
        <Box className="MenuList" sx={{display: "flex", flexWrap: "wrap", width: "100%"}}>
            {menus}
        </Box>
        );
    }
}

export default MenuList