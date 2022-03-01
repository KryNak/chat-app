package com.example.repositories;

import com.example.models.Message;
import com.example.models.UserUDT;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends CassandraRepository<Message, UUID> {

    List<Message> findAllBySenderInAndReceiverInOrderByCreatedAt(List<UserUDT> senders, List<UserUDT> receivers);

    default List<Message> findAllBySenderInAndReceiverInOrderByCreatedAt(List<UserUDT> users){
        return findAllBySenderInAndReceiverInOrderByCreatedAt(users, users);
    }

}
