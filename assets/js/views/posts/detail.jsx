import React, {Component} from 'react';

import CommentForm from '../comments/form';
import CommentList from '../comments/list';
import DateAndTime from '../../components/DateAndTime';
import LemonJuiceEditor from '../../components/LemonJuiceEditor';
import CategoryNameAndLink from '../../components/CategoryNameAndLink';
import urls from '../../utils/urlHelper';

import 'css/weblog/posts/detail.css';

export default class PostDetail extends Component {
  render() {
    const {
      post: {
        pk,
        title,
        category_id: categoryId,
        text,
        created_date: createdDate,
        updated_date: updatedDate,
        published_date: publishedDate,
        comments,
      },
      category,
      parentCategory,
      isAuthenticated,
      csrfToken
    } = this.props;

    return (
      <div className='post-detail'>
        <div className='post-detail-header'>
          <h2>{title}</h2>

          <div className='post-detail-info'>
            <CategoryNameAndLink category={category} parent={parentCategory} />
            <DateAndTime datetimeString={createdDate} />
          </div>

          {isAuthenticated === 'true' &&
            <div className='post-detail-admin-menu'>
              <a href={urls.post.edit(pk)}>수정</a>
              <a href={urls.post.remove(pk)}>삭제</a>
              {!publishedDate &&
                <a href={urls.post.publish(pk)}>공개</a>
              }
            </div>
          }
        </div>
        
        <LemonJuiceEditor
          value={text}
          hideTextarea={true}
          previewClassName='post-detail-content'
          />

        <div className='post-detail-comments'>

          <CommentList
            comments={comments}
            isAuthenticated={isAuthenticated}
            />

          <CommentForm
            postId={pk}
            csrfToken={csrfToken}
            />
        </div>
      </div>
    );
  }
}
