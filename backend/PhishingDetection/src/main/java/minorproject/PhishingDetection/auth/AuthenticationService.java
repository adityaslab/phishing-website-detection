package minorproject.PhishingDetection.auth;

import minorproject.PhishingDetection.entity.User;
import minorproject.PhishingDetection.error.ResourceNotFoundException;
import minorproject.PhishingDetection.model.AuthenticationRequest;
import minorproject.PhishingDetection.model.AuthenticationResponse;
import minorproject.PhishingDetection.model.RegisterRequest;
import minorproject.PhishingDetection.repository.UserRepository;
import minorproject.PhishingDetection.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        var token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .name(user.getFirstName()+" "+user.getLastName())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws ResourceNotFoundException {
        System.out.println(request.getEmail()+"in auth service "+request.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        System.out.println("after auth manager");
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(request.getEmail()+" not found!")); //some exception
        System.out.println(user.getUsername());
        var token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .id(user.getUserId())
                .token(token)
                .name(user.getFirstName()+" "+user.getLastName())
                .build();
    }
}
