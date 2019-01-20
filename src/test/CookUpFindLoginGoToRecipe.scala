import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class CookUpFindLoginGoToRecipe extends Simulation {

	val httpProtocol = http
		.baseUrl("https://new-cook-up.herokuapp.com")
		.inferHtmlResources()
		.acceptHeader("application/hal+json")
		.acceptEncodingHeader(" gzip, deflate")
		.acceptLanguageHeader("en-us")
		.userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15")

	val headers_0 = Map("Content-Type" -> "application/json")

	val headers_5 = Map("Accept" -> "*/*")

	val headers_9 = Map(
		"Accept" -> "*/*",
		"Accept-Encoding" -> "gzip, deflate",
		"Proxy-Connection" -> "keep-alive",
		"User-Agent" -> "com.apple.trustd/2.0")

	val headers_10 = Map("Origin" -> "https://new-cook-up.herokuapp.com")

	val scn = scenario("RecordedSimulation")
		.exec(http("request_0")
			.get("/api/loginSuccess")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/api/ingredients")
			.headers(headers_0),
            http("request_2")
			.get("/api/loginSuccess")
			.headers(headers_0),
            http("request_3")
			.get("/api/ingredients")
			.headers(headers_0)))
		.pause(13)
		.exec(http("request_4")
			.get("/api/matchingRecipes?ingredients=4,7,5&useSimilar=true")
			.headers(headers_0)
			.resources(http("request_5")
			.get("/fonts/fontawesome-webfont.woff2")
			.headers(headers_5)))
		.pause(1)
		.exec(http("request_6")
			.get("/fonts/glyphicons-halflings-regular.woff2")
			.headers(headers_5)
			.resources(http("request_7")
			.get("/api/recipes/430/comments")
			.headers(headers_0),
            http("request_8")
			.get("/api/recipes/430/author")
			.headers(headers_0)))
		.pause(5)
		.exec(http("request_10")
			.post("/api/login")
			.headers(headers_10)
			.formParam("username", "lolek@gmail.com")
			.formParam("password", "lolek"))
		.pause(3)
		.exec(http("request_11")
			.get("/api/accounts/1/favouriteRecipes/430")
			.headers(headers_0))
		.pause(1)
		.exec(http("request_12")
			.get("/api/accounts/1/favouriteRecipes")
			.headers(headers_0)
			.resources(http("request_13")
			.get("/api/accounts/1/createdRecipes")
			.headers(headers_0)))
		.pause(4)
		.exec(http("request_14")
			.get("/api/accounts/1/favouriteRecipes/430")
			.headers(headers_0))

	setUp(scn.inject(atOnceUsers(100))).protocols(httpProtocol)
}
