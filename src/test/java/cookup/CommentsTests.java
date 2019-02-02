package cookup;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

import cookup.config.Profiles;
import cookup.dto.CommentDto;

import static cookup.SessionIdHelper.getHeadersWithSessionId;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.DEFINED_PORT;

@SpringBootTest(webEnvironment = DEFINED_PORT)
@ActiveProfiles({Profiles.TEST, Profiles.DB_MOCK})
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = NONE)
public class CommentsTests {
  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  @SuppressWarnings("unchecked")
  public void shouldReturnCommentsForRecipe() {
    // when
    ResponseEntity<Map> responseEntity = restTemplate.getForEntity("/api/recipes/1/comments", Map.class);

    // then
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> comments = (List<Map>) embedded.get("recipeCommentDtoes");
    assertEquals(2, comments.size());

    assertEquals(1, comments.get(0).get("id"));
    assertEquals("first comment", comments.get(0).get("content"));
    assertEquals(1, comments.get(0).get("authorId"));
    assertEquals("lolek@gmail.com", comments.get(0).get("authorEmail"));
    assertNotNull(comments.get(0).get("created"));

    assertEquals(2, comments.get(1).get("id"));
    assertEquals("second comment", comments.get(1).get("content"));
    assertEquals(1, comments.get(1).get("authorId"));
    assertEquals("lolek@gmail.com", comments.get(1).get("authorEmail"));
    assertNotNull(comments.get(1).get("created"));
  }

  @Test
  public void shouldAddCommentAsAnonymous() {
    // given
    CommentDto comment = new CommentDto("newest comment");

    // when
    ResponseEntity<Map> responseEntity = restTemplate.postForEntity("/api/recipes/2/comments", comment, Map.class);

    // then
    ResponseEntity<Map> allCommentsResponse = restTemplate.getForEntity("/api/recipes/2/comments", Map.class);
    assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    Map lastComment = getLastComment(allCommentsResponse);
    assertEquals(comment.getContent(), lastComment.get("content"));
    assertNull(lastComment.get("authorId"));
    assertNull(lastComment.get("authorEmail"));
  }

  @Test
  public void shouldAddCommentAsLoggedInUser() {
    // given
    CommentDto comment = new CommentDto("logged in comment");
    MultiValueMap<String, String> headersWithSessionId = getHeadersWithSessionId(restTemplate);

    // when
    ResponseEntity<String> responseEntity = restTemplate.exchange("/api/recipes/2/comments", HttpMethod.POST,
        new HttpEntity<>(comment, headersWithSessionId), String.class);

    // then
    ResponseEntity<Map> allCommentsResponse = restTemplate.getForEntity("/api/recipes/2/comments", Map.class);
    assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    Map lastComment = getLastComment(allCommentsResponse);
    assertEquals(comment.getContent(), lastComment.get("content"));
    assertEquals(1, lastComment.get("authorId"));
    assertEquals("lolek@gmail.com", lastComment.get("authorEmail"));
  }

  @SuppressWarnings("unchecked")
  private Map getLastComment(ResponseEntity<Map> responseEntity) {
    Map embedded = (Map) responseEntity.getBody().get("_embedded");
    List<Map> comments = (List<Map>) embedded.get("recipeCommentDtoes");
    return comments.get(comments.size() - 1);
  }
}
