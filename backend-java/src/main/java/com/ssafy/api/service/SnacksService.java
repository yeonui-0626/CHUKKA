package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksReplyPostReq;
import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksLike;
import com.ssafy.db.entity.SnacksReply;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SnacksService {

    Page<Snacks> findAll(Pageable pageable);
    Snacks getCertainSnacks(Long snacksId);
    // 좋아요 기능
    String likeSnacks(User user, Long snacksId);
    // 댓글 기능
    SnacksReply createReply(SnacksReplyPostReq replyInfo, User user);
    Snacks uploadSnacks(SnacksUploadReq snacksInfo, User user);
    List<String> getPopularTags();

}
