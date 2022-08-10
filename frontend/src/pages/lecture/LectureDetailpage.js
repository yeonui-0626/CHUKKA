import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LevelBadge from '../../components/LevelBadge';
import CategoryBadge from '../../components/CategoryBadge';
import StyledButton from '../../components/Button';
import ReviewStar from '../../components/lectures/ReviewStar';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 0rem 6rem;
`;

const LectureInfo = styled.div`
  display: flex;
  & .thumbnail-img {
    width: 60%;
  }
  margin-bottom: 1.5rem;
`;

const LectureInfoDetail = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 50px;
  flex-grow: 1;
  & .title {
    border-bottom: 4px solid #ff2c55;
    padding-bottom: 0.6rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  box-sizing: border-box;
  & button {
    width: 100%;
  }
  & .sub-info {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-bottom: 1rem;
    flex-grow: 1;
    font-size: 1.2rem;
    justify-content: space-between;

    & span {
      font-weight: bold;
    }
  }
`;

const BadgeDiv = styled.div`
  display: flex;
  & div {
    margin-right: 10px;
  }
`;

const NoticeDiv = styled.div`
  width: 100%;
  background-color: #316cc3;
  color: white;
  height: 65px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
`;

const LectureSubTitle = styled.div`
  width: 100%;
  border-bottom: 3px solid #ff2c55;
  padding-bottom: 1rem;
`;

const LectureNav = styled.div`
  margin-bottom: 2rem;
  & a {
    font-size: 1.6rem;
    margin-right: 2rem;
  }
`;

const LectureSubContent = () => {
  const SubContent = styled.div`
    margin-bottom: 2rem;
    height: 700px;
  `;
  return <SubContent></SubContent>;
};

const InstructorInfo = ({ instructorInfo }) => {
  const InstWrapper = styled.div`
    display: flex;
    margin: 1rem 0rem;
    padding: 2rem;
    & img {
      height: 400px;
    }
    & .ins-info {
      padding-left: 2rem;
      div {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    }
  `;

  const { ins_profile, ins_name, ins_introduce, ins_email } = instructorInfo;
  return (
    <InstWrapper>
      <img src={ins_profile} alt="" />
      <div className="ins-info">
        <h1>{ins_name}</h1>
        <div className="ins-email">{ins_email}</div>
        <div className="ins-introduce">{ins_introduce}</div>
      </div>
    </InstWrapper>
  );
};

const ReviewContainer = ({ reviews }) => {
  const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
    padding: 2rem;
  `;
  return (
    <ReviewWrapper>
      {reviews.map((review, index) => (
        <ReviewItem review={review} key={review.id} />
      ))}
      {/* <ReviewItem review={reviews[2]} /> */}
    </ReviewWrapper>
  );
};

const ReviewItem = ({ review }) => {
  const ReviewItemWrapper = styled.div`
    display: flex;
    /* align-items: center; */
    /* border: 1px solid white; */
    margin-bottom: 1rem;
    min-height: 80px;
    & img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    & .review-body {
      padding-left: 1.5rem;
    }
    & .review-header {
      display: flex;
      margin-bottom: 8px;
    }
    & .review-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-right: 12px;
    }
  `;
  return (
    <ReviewItemWrapper>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        alt=""
      />
      <div className="review-body">
        <div className="review-header">
          <span className="review-title">{review.user_id}</span>
          <ReviewStar score={review.review_score} />
        </div>
        <div>{review.review_contents}</div>
      </div>
    </ReviewItemWrapper>
  );
};

const LectureDetailpage = () => {
  const { lectureId } = useParams();
  const { title, content, thumbnail, level, genre, category } = useSelector(
    (state) => state.lecture,
  );
  const instructorInfo = {
    ins_profile: 'https://pbs.twimg.com/media/EFI_9boU4AEWVJp?format=jpg',
    ins_name: '임나연',
    ins_introduce:
      'JYP엔터테인먼트 소속 9인조 그룹 TWICE의 멤버. 팀에서 리드보컬, 리드댄서를 맡고 있다. 2022년 6월 24일 첫 미니 앨범인 IM NAYEON을 발매하며 솔로 활동을 시작했다. 캐치프레이즈는 밝은 에너지. 상징 색깔은 하늘색 (#5bc2e7).팀 내에서 리드댄서를 맡고 있다. 타고난 선과 감각으로 춤의 포인트가 되는 부분들의 강약을 잘 살린다. 특히 나연이 많은 사람들로부터 춤선이 뛰어나다고 호평을 받았던 Alcohol-Free 안무처럼 허리와 골반의 움직임을 포인트로 사용한 안무에 매우 특출하다. 또한 군무를 할 때 센터에서의 밸런스와 춤선이 뛰어나다. 손가락이 길고 동작이 섬세하여 손을 사용한 디테일한 안무를 잘 살린다는 평가가 있다. 마치 마술사가 관객을 현혹하듯 공연에서 손과 손가락 하나 하나의 움직임이 섬세하고 아름답다. 무대 시야가 넓고 관객과의 소통에 능숙하다. 일방적인 무대가 아닌 주위에 시야를 넓게 두고 강약과 완급을 조절하며 무대를 여유롭고 자유롭게 즐긴다.',
    ins_email: 'limNaYeon@gmail.com',
  };
  const reviews = [
    {
      review_id: 1,
      user_id: '유노준',
      review_score: 4,
      review_regdate: '2022-08-10',
      review_contents: '낫밷',
    },
    {
      review_id: 2,
      user_id: '최지원',
      review_score: 5,
      review_regdate: '2022-08-10',
      review_contents: '나연 최고',
    },
    {
      review_id: 3,
      user_id: '홍성목',
      review_score: 3,
      review_regdate: '2022-08-10',
      review_contents:
        '가나다라마바사 아자차카타파하 목업이 거의 완성이 되는 것 같습니다. 아마도 ?  배경이 너무 어둡지 않나 라는 생각이 조금 들긴 하지만 괜찮은 것 같습니다. 이것은 리뷰입니다. 한 세줄정도 쓰고 그만 쓰려고 합니다. 배가 고파요. 오늘 점심에 해물 야끼우동이었나 그랬던거 같은데 맛있었으면 좋곘습니다. 그럼 이만',
    },
  ];
  return (
    <Wrapper>
      <LectureInfo>
        <img src={thumbnail} alt="" className="thumbnail-img" />
        <LectureInfoDetail>
          <div className="title">
            <h1>{title}</h1>
          </div>
          <BadgeDiv>
            <LevelBadge level={level} />
            <CategoryBadge category={genre} />
            <CategoryBadge category={category} />
          </BadgeDiv>
          <div className="sub-info">
            <div>
              강사 : <span>임나연</span>
            </div>
            <div>
              강의 기간 : <span>7주, 주 1회</span>
            </div>
            <div>
              강의 시간 : <span>매주 월요일, 20:00</span>
            </div>
            <div>
              수강 인원 : <span>2 / 6</span>
            </div>
            <div>
              <>총 금액 : </>
              <span>109,990원</span>
            </div>
          </div>
          <StyledButton content="장바구니에 담기" />
        </LectureInfoDetail>
      </LectureInfo>
      {/* <NoticeDiv>공지사항 </NoticeDiv> */}
      <LectureNav>
        <a href="#info">강의 정보</a>
        <a href="#instructor">강사 소개</a>
        <a href="#review">리뷰</a>
      </LectureNav>
      <LectureSubTitle id="info">
        <h1>강의 정보</h1>
      </LectureSubTitle>
      <LectureSubContent>11</LectureSubContent>

      <LectureSubTitle id="instructor">
        <h1>강사 소개</h1>
      </LectureSubTitle>
      <InstructorInfo instructorInfo={instructorInfo} />

      <LectureSubTitle id="review">
        <h1>리뷰</h1>
      </LectureSubTitle>
      <ReviewContainer reviews={reviews} />
    </Wrapper>
  );
};

export default LectureDetailpage;
