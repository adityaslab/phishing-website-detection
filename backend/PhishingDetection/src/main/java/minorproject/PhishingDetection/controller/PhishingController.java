package minorproject.PhishingDetection.controller;

import minorproject.PhishingDetection.entity.PhishingSiteUrls;
import minorproject.PhishingDetection.entity.ResponseParameter;
import minorproject.PhishingDetection.model.URLRequest;
import minorproject.PhishingDetection.model.URLResponse;
import minorproject.PhishingDetection.repository.PhishingSiteUrlsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/phishing")
public class PhishingController {
    @Autowired
    PhishingSiteUrlsRepository phishingSiteUrlsRepository;

    @CrossOrigin
    @PostMapping("/getParameters")
    public ResponseEntity<ResponseParameter> getParameters(@RequestBody URLRequest url){
        String u = url.getUrl();
        int ip = 1;
        int i=0;
        if(u.startsWith("https")) i = 8;
        if(u.startsWith("http")) i = 7;
        for(;i<u.length();i++){
            char c = u.charAt(i);
            if(c=='/') break;
            if((c == '.') || Character.isDigit(c)){
                continue;
            }
            else{
                ip = -1;
                break;
            }
        }
        int https = (u.startsWith("https")) ? 1 : -1 ;
        int longurl = (u.length()<54) ? -1 : (u.length()>=75 ? 1 : 0) ;
        int shorturl = (u.contains("tinyurl") || u.contains("bit.ly")) ? 1 : -1 ;
        int pref = (u.contains("-")) ? 1 : -1;
        int symbol = (u.contains("@")) ? 1 : -1;
        ResponseParameter parameters = ResponseParameter.builder()
                .longURL(longurl)
                .shortURL(shorturl)
                .preffixSuffix(pref)
                .https(https)
                .usingIp(ip)
                .symbol(symbol)
                .build();
        return ResponseEntity.ok(parameters);
    }

    @CrossOrigin
    @PostMapping("/getPhishingUrl")
    public ResponseEntity<URLResponse> getPhishingUrl(@RequestBody URLRequest url){
        Optional<PhishingSiteUrls> p = phishingSiteUrlsRepository.findById(url.getUrl());

        String label = "";
        if(p.isPresent()){
            label = (p.get().getLabel().equals("bad")) ? "Phishing Detected" : "No Phishing";
        }
        else{
            label = "Not in the database";
        }

        return ResponseEntity.ok(URLResponse.builder().result(label).build());
    }
}
