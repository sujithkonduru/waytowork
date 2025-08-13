package com.projecthouse.Dto;

public class MailBody {

	    private String to;
	    private String subject;
	    private String text;

	    // Constructor
	    public MailBody(String to, String subject, String text) {
	        this.to = to;
	        this.subject = subject;
	        this.text = text;
	    }

	    // Getters
	    public String to() {
	        return to;
	    }

	    public String subject() {
	        return subject;
	    }

	    public String text() {
	        return text;
	    }
	}

