import React, { Component } from 'react';
import './css/Post.css';
import {db} from './firebase'
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import NoImageIcon from './assets/no_image.jpeg'

class Post extends Component {

  deletePost(docId) {
    db.collection("meals").doc(docId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }
  
  render() {
    const className = 'post'

    const data = [
      {item: 'おてがるさ', value: this.props.ease_score},
      {item: 'ヘルシー', value: this.props.health_score},
      {item: 'コスパ', value: this.props.cost_score}
    ]

    let image_url = this.props.image_url
    if (!this.props.image_url) {
      image_url = NoImageIcon
    }
    
    return(
      <li className={className}>
        <span>{this.props.number}: {this.props.title} 
          
        </span>
        <IconButton 
          aria-label="delete" 
          size="small"
          sx={{
            margin: 0.4,
          }}
          onClick={() => {this.deletePost(this.props.id)}}
        >
          <DeleteOutlinedIcon sx={{ color: red[400] }} />
        </IconButton>
        

        <div class="flex">
          <div class="image-wrapper">
            <img src={image_url} width="150"></img>
          </div>
          <RadarChart  // レーダーチャート全体の設定を記述
              cx="50%"  // 要素の左端とチャートの中心点との距離(0にするとチャートの左半分が隠れる)
              cy="50%"  // 要素の上部とチャートの中心点との距離(0にするとチャートの上半分が隠れる)
              outerRadius={90}  // レーダーチャート全体の大きさ  
              width={250}  // レーダーチャートが記載される幅(この幅よりチャートが大きい場合、はみ出た箇所は表示されない)
              height={220}   // レーダーチャートが記載される高さ
              data={data}  
          >
              {/* レーダーチャートの蜘蛛の巣のような線 */}
              <PolarGrid />
              {/* 項目を決めるデータのキー(サンプルでいう数学や歴史) */}
              <PolarAngleAxis 
                dataKey="item" 
                fill="fff"
                tick={{fill: 'white', fontSize: 10}}
              />
              
              {/* 目安となる数値が表示される線を指定  */}
              <PolarRadiusAxis 
                  angle={90}  // 中心点から水平を0°とした時の角度 垂直にしたいなら90を指定
                  domain={[1,5]}  // リストの１番目の要素が最小値、2番目の要素が最大値
              />  
              
              {/* レーダーを表示 */}
              <Radar
                  dataKey="value"   // 表示する値と対応するdata内のキー
                  stroke="#ffaa00"  // レーダーの外枠の色
                  fill="#ffaa00"  // レーダー内の色
                  fillOpacity={0.6}  // レーダー内の色の濃さ(1にすると濃さMAX)
              />
          </RadarChart>
        </div>
        <div class="discription">
          <p>{this.props.description}</p>
        </div>
        <p>{this.props.created_at}</p>
        
        
      </li>

      

    );
  }

}

export default Post