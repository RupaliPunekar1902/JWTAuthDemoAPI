using JWTAuthDemoAPI.Data;
using JWTAuthDemoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTAuthDemoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JWTAuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IConfiguration _config;
        public JWTAuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("signup")]
        public IActionResult Signup(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok("User Registered");
        }

        [HttpPost("login")]
        public IActionResult Login(User login)
        {
            var user = _context.Users
                .FirstOrDefault(x =>
                    x.Email == login.Email &&
                    x.Password == login.Password);

            if (user == null)
                return Unauthorized("Invalid Credentials");

            var token = GenerateToken(user);

            return Ok(new { token });
        }

        private object GenerateToken(User objUser)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, objUser.Email),
            };

            var key = new SymmetricSecurityKey(
             Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var creds = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer : _config["Jwt:Issuer"],
                audience : _config["Jwt:Audience"],
                claims:claims,
                expires : DateTime.Now.AddHours(1),
                signingCredentials : creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
