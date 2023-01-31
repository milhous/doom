import {IActivityData} from '@promotions/api';

import HomeListItem from './HomeListItem';
import './HomeList.scss';

// 活动列表
const HomeList = (props: {data: IActivityData[]}): JSX.Element => {
  const {data} = props;

  return (
    <>
      {data.length > 0 && (
        <ul className="promotions-list">
          {data.map((item: IActivityData) => {
            return (
              <HomeListItem data={item} key={item.id} />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default HomeList;
