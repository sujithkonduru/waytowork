package com.projecthouse.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projecthouse.Entity.Role;
import com.projecthouse.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ This allows Spring Data JPA to generate query based on method name
    Optional<User> findByEmail(String email);
    void deleteById(Long id);


    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    // ✅ Correct query to fetch users by role name and status
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :role AND u.status = :status")
    List<User> findByRoleAndStatus(String role, String status);

    // ✅ Custom query to find user by email and role (if role is stored in a collection)
    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.email = :email AND r.name = :role")
    Optional<User> findByEmailAndRole(String email, String role);

    @Query("SELECT u FROM User u WHERE LOWER(u.skills) LIKE LOWER(CONCAT('%', :skill, '%'))")
    List<User> findBySkillsIgnoreCase(@Param("skill") String skill);
	List<User> findByRolesContaining(Role role);

}
