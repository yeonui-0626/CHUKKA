package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SnacksHeart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int snacksLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snacks_id")
    Snacks snacks;

    @Temporal(TemporalType.DATE)
    Date likeSnacksReg;
}
