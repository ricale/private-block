import React, {Component} from 'react';
import lemonJuice from 'lemon-juice';

import CommentForm from '../comments/form';
import DateAndTime from '../../components/DateAndTime';
import urls from '../../utils/urlHelper';

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
      isAuthenticated,
      csrfToken
    } = this.props;

    return (
      <div>
        <div className='post-detail-header'>
          <h2>{title}</h2>

          <div>
            {category.name}
          </div>

          <div>
            <span>최초 작성: </span>
            <DateAndTime datetimeString={createdDate} />
          </div>
          <div>
            <span>최종 갱신: </span>
            <DateAndTime datetimeString={updatedDate} />
          </div>
          <div>
            <span>공개: </span>
            <DateAndTime datetimeString={publishedDate} />
          </div>

          {isAuthenticated === 'true' &&
            <div>
              <a href={urls.post.edit(pk)}>수정</a>
              <a href={urls.post.remove(pk)}>삭제</a>
              {!publishedDate &&
                <a href={urls.post.publish(pk)}>공개</a>
              }
            </div>
          }
        </div>
        
        <div className='post-detail-content' dangerouslySetInnerHTML={{__html: lemonJuice.decode(text)}}></div>

        <div className='post-detail-comments'>
          <div>
            {comments.map(c =>
              (isAuthenticated === 'true' || c.approved === 'true') &&
                <div key={`comment-${c.pk}`} className='post-detail-comment'>
                  {isAuthenticated === 'true' &&
                    <div>
                      {c.approved !== 'true' &&
                        <a href={urls.comment.approve(c.pk)}>승인</a>
                      }
                      <a href={urls.comment.remove(c.pk)}>삭제</a>
                    </div>
                  }
                  <div className="comment-author">{c.author}</div>
                  <DateAndTime datetimeString={c.created_date} />
                  <div>{c.text}</div>
                </div>
            )}
          </div>

          <CommentForm
            postId={pk}
            csrfToken={csrfToken}
            />
        </div>
      </div>
    );
  }
}
