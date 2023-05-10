package minorproject.PhishingDetection.auth;

import minorproject.PhishingDetection.error.ResourceNotFoundException;
import minorproject.PhishingDetection.model.AuthenticationRequest;
import minorproject.PhishingDetection.model.AuthenticationResponse;
import minorproject.PhishingDetection.model.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(authenticationService.register(request));
    }

    @CrossOrigin
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticateRequest(
            @RequestBody AuthenticationRequest request
    ) throws ResourceNotFoundException {
        System.out.println(request.getEmail()+"1123");
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
