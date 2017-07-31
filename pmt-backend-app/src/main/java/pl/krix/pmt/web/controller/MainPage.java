package pl.krix.pmt.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by krix on 30.08.16.
 */

@Controller
public class MainPage {


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getMainPage(){
        return "mainPage";
    }

}
